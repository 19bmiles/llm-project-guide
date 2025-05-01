import { Octokit } from '@octokit/rest';
import { program } from 'commander';
import chalk from 'chalk';
import { loadConfig } from './utils/config';
import { fetchPRData } from './utils/github';

program
  .name('hackai-log')
  .description('Generate documentation from PR and Cursor chats')
  .requiredOption('-p, --pr <number>', 'Pull-request number')
  .option('-c, --config <path>', 'Path to config file', './.env')
  .parse();

const { pr, config: configPath } = program.opts();

async function main() {
  try {
    // Load and validate configuration
    const config = await loadConfig(configPath);
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: config.github.token });
    
    // Fetch PR data and diff
    const githubData = await fetchPRData(octokit, config, parseInt(pr, 10));
    
    // For now, just log the data we've gathered
    console.log(chalk.green('\n✨ Successfully gathered GitHub data:'));
    console.log(chalk.cyan('\nPR Info:'));
    console.log(`Title: ${githubData.pr.title}`);
    console.log(`Number: ${githubData.pr.number}`);
    console.log(`Labels: ${githubData.pr.labels.map(l => l.name).join(', ')}`);
    console.log(`Commit: ${githubData.commitUrl}`);
    
    console.log(chalk.cyan('\nDiff Summary:'));
    console.log(`Total hunks: ${githubData.diff.hunks.length}`);
    githubData.diff.hunks.forEach((hunk, i) => {
      console.log(`\nHunk ${i + 1}:`);
      console.log(`Lines: ${hunk.startLine}-${hunk.endLine} (${hunk.lineCount} lines)`);
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
    } else {
      console.error(chalk.red('\n❌ Unknown error occurred'));
    }
    process.exit(1);
  }
}

main(); 