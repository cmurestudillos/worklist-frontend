import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import configPrettier from '@vue/eslint-config-prettier'

export default [
  { files: ['**/*.{js,mjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  configPrettier,
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  },
  { ignores: ['dist/**', 'node_modules/**'] }
]
