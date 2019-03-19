import inspector from 'inspector';
import fs from 'fs';

export class Profiler {
  private session: inspector.Session;

  private tmpPath: string;

  public constructor(tmpPath: string) {
    this.session = new inspector.Session();
    this.tmpPath = tmpPath || '';
  }

  public start(): Promise<void> {
    return new Promise(resolve => {
      this.session.connect();
      this.session.post('Profiler.enable', () => {
        this.session.post('Profiler.start', () => {
          this.session.post('Profiler.startTypeProfile', () => {
            resolve();
          });
        });
      });
    });
  }

  public stop(): void {
    this.session.post(
      'Profiler.takeTypeProfile',
      (typeProfileError, typeProfile) => {
        if (typeProfileError) {
          throw typeProfileError;
        }
        this.session.post(
          'Profiler.getBestEffortCoverage',
          (coverageReportError, coverageReport) => {
            if (coverageReportError) {
              throw coverageReportError;
            }
            const result = {
              coverageReport: coverageReport.result,
              typeProfile: typeProfile.result,
            };
            this.session.disconnect();
            fs.writeFileSync(this.tmpPath, JSON.stringify(result, null, 2));
          },
        );
      },
    );
  }
}
