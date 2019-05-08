import { File, Warning } from '@esmbly/types';
import chalk from 'chalk';
import { SourceLocation } from '@babel/types';

function location(file?: File, loc?: SourceLocation | null): string {
  if (!file) {
    return '';
  }

  const line = loc ? loc.start.line : null;
  const column = loc ? loc.start.column : null;
  const position = line !== null && column !== null ? `:${line}:${column}` : '';
  const path = `${file.dir}/${file.name}${file.type}${position}`.replace(
    /^\/+/g,
    '',
  );
  return `${chalk.dim('at:')} ${chalk.cyan(path)}`;
}

function removeLeadingWhitespace(
  str: string,
): {
  line: string;
  trimmed: number;
} {
  let line = '';
  let foundChar = false;
  let trimmed = 0;

  for (let i = 0; i < str.length; i += 1) {
    const isWhitespace = str[i] === ' ';

    if (isWhitespace && !foundChar) {
      trimmed += 1;
    } else {
      if (!isWhitespace) {
        foundChar = true;
      }

      line += str[i];
    }
  }

  return { line, trimmed };
}

function issue(file?: File, loc?: SourceLocation | null): string {
  if (!file || !loc) {
    return '';
  }

  const lines = file.content.toString().split('\n');
  const { line, trimmed } = removeLeadingWhitespace(lines[loc.start.line - 1]);
  const start = loc.start.column - trimmed;
  const end =
    loc.start.line === loc.end.line ? loc.end.column - trimmed : line.length;
  const leading = chalk.dim(line.slice(0, start));
  const highlighted = chalk.red(line.slice(start, end + 1));
  const trailing = chalk.dim(line.slice(end + 2));
  return `${leading}${highlighted}${trailing}`;
}

function url(issueUrl?: string): string {
  if (!issueUrl) {
    return '';
  }

  return `${chalk.dim('issue:')} ${chalk.cyan(issueUrl)}`;
}

export function warning({ info, loc, file, issueUrl }: Warning): string {
  return `
  ${chalk.yellow('warning')} ${chalk.dim(info)}

    ${issue(file, loc)}
  
  ${location(file, loc)}
  ${url(issueUrl)}

`;
}
