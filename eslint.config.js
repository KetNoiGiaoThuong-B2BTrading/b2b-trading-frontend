import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.eslint.json',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            'jsx-a11y': eslintPluginJsxA11y,
            prettier: eslintPluginPrettier,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginJsxA11y.configs.recommended.rules,
            'jsx-a11y/alt-text': 'warn',
            'prettier/prettier': 'warn',
            'react/react-in-jsx-scope': 'off', // React 17+
            'react/prop-types': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
        },
    },
    prettier,
];
