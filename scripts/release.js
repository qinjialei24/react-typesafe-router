const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function exec(command) {
  execSync(command, { stdio: 'inherit' });
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  return packageJson.version;
}

function updateVersion(type) {
  exec(`npm version ${type} --no-git-tag-version`);
}

function commitPackageChanges() {
  const newVersion = getCurrentVersion();
  const commitMessage = `release: v${newVersion}`;
  try {
    exec('git add package.json');
    exec(`git commit -m "${commitMessage}"`);
  } catch (error) {
    console.log('No changes to package.json needed.');
  }
}

function buildPackage() {
  exec('pnpm run build');
}

function publishToNpm() {
  exec('npm publish');
}

function release(type) {
  try {
    // 检查工作目录
    if (!checkWorkingDirectory()) {
      console.log('Warning: You have uncommitted changes in your working directory.');
      rl.question('Do you want to continue with the release? (y/n): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log('Release cancelled.');
          rl.close();
          return;
        }
        continueRelease(type);
      });
    } else {
      continueRelease(type);
    }
  } catch (error) {
    console.error('Release failed:', error.message);
    rl.close();
    process.exit(1);
  }
}

function runTests() {
  exec('pnpm run test:ci');
}

function continueRelease(type) {
  try {
    // 拉取最新的更改
    exec('git pull');

    // 运行测试
    runTests();

    // 更新版本
    updateVersion(type);

    // 构建包
    buildPackage();

    // 提交 package.json 的更改
    commitPackageChanges();

    // 推送到 Git
    exec('git push --follow-tags');

    // 发布到 npm
    publishToNpm();

    const newVersion = getCurrentVersion();
    console.log(`Successfully released version v${newVersion}`);
    rl.close();
  } catch (error) {
    console.error('Release failed:', error.message);
    rl.close();
    process.exit(1);
  }
}

rl.question('Enter release type (patch/minor/major): ', (answer) => {
  if (['patch', 'minor', 'major'].includes(answer)) {
    release(answer);
  } else {
    console.log('Invalid release type. Please enter patch, minor, or major.');
    rl.close();
  }
});
