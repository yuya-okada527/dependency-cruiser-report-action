import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

import { getOptions } from './options'
import { generateReport } from './report/generateReport'
import { runDepcruise } from './runDepcruise'

export const run = async (): Promise<void> => {
  const options = getOptions()
  const octokit = getOctokit(options.token)

  const mermaidText = await runDepcruise(options)
  await generateReport(octokit, options, mermaidText)
}

try {
  void run()
} catch (error) {
  if (error instanceof Error) core.setFailed(error.message)
}
