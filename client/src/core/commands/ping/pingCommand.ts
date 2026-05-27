import { CommandType } from '../../command';

const pingCommand: CommandType = {
  func: 'ping',
  name: 'ping',
  desc: 'check if a specific address is alive',
  alias: [],
  params: [
    {
      key: 'dest',
      desc: 'target address',
      required: true,
    },
  ],
  options: [
    {
      key: 'timeout',
      desc: 'request timeout limit (unit: milliseconds)',
      alias: ['t'],
      type: 'string',
      defaultValue: '3000',
    },
  ],
  async action(options, terminal, parentCommand) {
    const { _ } = options;
    const { timeout = '3000' } = options;
    if (_.length < 1) {
      terminal.writeErrorOutput('missing required parameters');
      return;
    }
    var dest = _[0];
    if (
      !dest.toLowerCase().startsWith('http://') &&
      !dest.toLowerCase().startsWith('https://')
    ) {
      dest = 'https://' + dest;
    }
    if (dest.toLowerCase().startsWith('http://')) {
      dest = dest.replace('http://', 'https://');
    }
    const startTime = new Date().getTime();
    const res = await Promise.race([
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('timeout')), Number(timeout));
      }),
      fetch(dest, { mode: 'no-cors', cache: 'reload' }),
    ])
      .then((resp: any) => {
        if (resp.ok || resp.status == 200 || resp.type == 'opaque') {
          console.log(resp);
          const finishTime = new Date().getTime();
          terminal.writeSuccessOutput('target address is alive');
          terminal.writeInfoOutput(
            `latency=${(finishTime - startTime).toString()}ms`
          );
        } else {
          terminal.writeErrorOutput('ping failed!');
        }
      })
      .catch((error) => {
        console.log(error);
        terminal.writeErrorOutput('ping failed!');
      });
  },
};

export default pingCommand;
