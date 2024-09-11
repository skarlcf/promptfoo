import { SERVER_MODE } from '@promptfoo/constants';

export function serverMode(): SERVER_MODE {
  if (process.env.SERVER_MODE) {
    return SERVER_MODE[process.env.SERVER_MODE as keyof typeof SERVER_MODE] || SERVER_MODE.OPEN;
  }
  return SERVER_MODE.OPEN;
}
