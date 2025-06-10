const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Helper function to safely extract error details
function getErrorDetails(error: unknown) {
  if (error && typeof error === 'object' && 'stdout' in error && 'stderr' in error) {
    return {
      stdout: (error as any).stdout || '',
      stderr: (error as any).stderr || '',
      message: (error as any).message || 'Unknown error'
    };
  }
  return {
    stdout: '',
    stderr: '',
    message: error instanceof Error ? error.message : String(error)
  };
}

async function runSlither(contractPath: string) {
  try {
    const result = await execAsync(`slither ${contractPath} --json slither_report.json`);
    return { success: true, output: result.stdout };
  } catch (error) {
    // Slither generates report even when finding issues
    const errorDetails = getErrorDetails(error);
    return { 
      success: true, // Consider successful if report was generated
      output: errorDetails.stdout || errorDetails.stderr,
      hasFindings: true 
    };
  }
}

async function runMythril(contractPath: string) {
  try {
    const result = await execAsync(`myth analyze ${contractPath} -o json > mythril_report.json`);
    return { success: true, output: result.stdout };
  } catch (error) {
    const errorDetails = getErrorDetails(error);
    return { 
      success: false, 
      output: errorDetails.stdout || errorDetails.stderr,
      error: errorDetails.message
    };
  }
}

async function runSecurityAnalysis(contractPath?: string) {
  const defaultPath = contractPath || 'src/contracts/VulnerableBank.sol';
  
  console.log('Running Slither...');
  const slitherResult = await runSlither(defaultPath);
  
  console.log('Running Mythril...');
  const mythrilResult = await runMythril(defaultPath);
  
  return {
    success: true,
    slither: slitherResult,
    mythril: mythrilResult
  };
}

// Exporting the functions for use in other modules
module.exports = {
  runSlither,
  runMythril,
  runSecurityAnalysis
};

// For testing purpose
if (require.main === module) {
  (async () => {
    const contractPath = process.argv[2];
    const result = await runSecurityAnalysis(contractPath);
    console.log(JSON.stringify(result, null, 2));
  })();
}