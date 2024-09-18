import asyncio
import importlib.util
import io
import json
import logging
import os
import sys


class LoggingIO(io.StringIO):
    def __init__(self, logger, level):
        super().__init__()
        self.logger = logger
        self.level = level

    def write(self, msg):
        if msg.strip():
            self.logger.log(self.level, msg.strip())


def setup_logging(log_level):
    logger = logging.getLogger("PythonScript")
    logger.setLevel(log_level)
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(levelname)s:%(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def call_method(script_path, method_name, log_level, *args):
    script_dir = os.path.dirname(os.path.abspath(script_path))
    module_name = os.path.basename(script_path).rsplit(".", 1)[0]
    if script_dir not in sys.path:
        sys.path.insert(0, script_dir)

    logger = setup_logging(log_level)
    logger.info(f"Importing module {module_name} from {script_dir} ...")

    spec = importlib.util.spec_from_file_location(module_name, script_path)
    script_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(script_module)

    method_to_call = getattr(script_module, method_name)

    # Redirect stdout and stderr to our custom IO classes
    sys.stdout = LoggingIO(logger, logging.INFO)
    sys.stderr = LoggingIO(logger, logging.ERROR)

    try:
        if asyncio.iscoroutinefunction(method_to_call):
            result = asyncio.run(method_to_call(*args))
        else:
            result = method_to_call(*args)
    finally:
        # Restore stdout and stderr
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

    return result


if __name__ == "__main__":
    script_path = sys.argv[1]
    method_name = sys.argv[2]
    log_level = sys.argv[3]
    json_path = sys.argv[4]
    output_path = sys.argv[5]

    with open(json_path, "r", encoding="utf-8") as fp:
        data = json.load(fp)

    log_level = getattr(logging, log_level.upper())
    result = call_method(script_path, method_name, log_level, *data)

    with open(output_path, "w", encoding="utf-8") as fp:
        json.dump({"type": "final_result", "data": result}, fp)
