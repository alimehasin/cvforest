import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface TranslationObject {
  [key: string]: TranslationValue;
}

type TranslationValue = string | TranslationObject;

interface ValidationResult {
  file: string;
  violations: Array<{ key: string; level: number; issue: string }>;
}

function isCamelCaseKeySegment(key: string): boolean {
  if (key === '_') {
    return true;
  }

  return /^[a-z][a-zA-Z0-9]*$/.test(key);
}

function validateNesting(
  obj: TranslationValue,
  prefix = '',
  level = 0,
): Array<{ key: string; level: number; issue: string }> {
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }

  const violations: Array<{ key: string; level: number; issue: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const currentLevel = level + 1;

    // Check key segment is camelCase at every level
    if (!isCamelCaseKeySegment(key)) {
      violations.push({
        key: fullKey,
        level: currentLevel,
        issue: 'key segment is not camelCase',
      });
    }

    // Check if nesting exceeds level 2
    if (currentLevel > 2) {
      violations.push({
        key: fullKey,
        level: currentLevel,
        issue: 'exceeds 2 levels',
      });
    }

    if (typeof value === 'object' && value !== null) {
      // Recursively check nested objects
      violations.push(...validateNesting(value, fullKey, currentLevel));
    } else if (typeof value === 'string') {
      // Check if this is a leaf node at the correct level
      if (currentLevel !== 2) {
        violations.push({
          key: fullKey,
          level: currentLevel,
          issue:
            currentLevel < 2 ? 'only 1 level (needs 2)' : 'exceeds 2 levels',
        });
      }
    }
  }

  return violations;
}

async function validateFile(filePath: string): Promise<ValidationResult> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content) as TranslationObject;
    return { file: filePath, violations: validateNesting(data) };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return { file: filePath, violations: [] };
  }
}

async function findI18nFiles(): Promise<string[]> {
  const files: string[] = [];
  const apps = ['dashboard', 'website'];

  for (const app of apps) {
    const messagesDir = join(
      process.cwd(),
      'apps',
      app,
      'src',
      'i18n',
      'messages',
    );

    try {
      const entries = await readdir(messagesDir);
      const jsonFiles = entries.filter((file) => file.endsWith('.json'));
      files.push(...jsonFiles.map((file) => join(messagesDir, file)));
    } catch (error) {
      console.warn(`Could not read directory ${messagesDir}:`, error);
    }
  }

  return files;
}

async function main() {
  console.log(
    '🔍 Validating i18n files for:\n   - Exactly two-level nesting\n   - camelCase keys\n',
  );

  const files = await findI18nFiles();

  if (files.length === 0) {
    console.log('❌ No i18n files found');
    process.exit(1);
  }

  console.log(`📁 Found ${files.length} i18n files to validate\n`);

  const results = await Promise.all(files.map(validateFile));
  const totalViolations = results.reduce(
    (sum, r) => sum + r.violations.length,
    0,
  );

  console.log('📊 Validation Results:\n');

  for (const result of results) {
    const relativePath = result.file.replace(process.cwd(), '.');

    if (result.violations.length === 0) {
      console.log(`✅ ${relativePath} - No violations`);
    } else {
      console.log(
        `❌ ${relativePath} - ${result.violations.length} violation(s):`,
      );
      for (const violation of result.violations) {
        console.log(`   • ${violation.key} - ${violation.issue}`);
      }
      console.log();
    }
  }

  console.log('\n📈 Summary:');
  console.log(`   Total files: ${files.length}`);
  console.log(
    `   Files with violations: ${results.filter((r) => r.violations.length > 0).length}`,
  );
  console.log(`   Total violations: ${totalViolations}`);

  if (totalViolations > 0) {
    console.log('\n💡 Rules:');
    console.log('   - All translation keys must have EXACTLY 2 levels');
    console.log('   ❌ canceled (only 1 level)');
    console.log('   ✅ reservation.canceled (exactly 2 levels)');
    console.log('\n   ❌ reservation.statuses.canceled (3 levels)');
    console.log('   ✅ reservation.canceled (exactly 2 levels)');
    console.log('\n   - All key segments must be camelCase');
    console.log('   ❌ reservation.canceled_status (snake_case)');
    console.log('   ❌ reservation.Canceled (PascalCase)');
    console.log('   ✅ reservation.canceledStatus (camelCase)');
    process.exit(1);
  }

  console.log(
    '\n🎉 All i18n files follow the exact two-level nesting rule and camelCase keys!',
  );
  process.exit(0);
}

main().catch((error) => {
  console.error('Validation failed:', error);
  process.exit(1);
});
