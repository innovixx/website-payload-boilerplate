// TypeScript declaration to silence TS2882 errors for side-effect CSS import from '@payloadcms/next/css'.
// This is a workaround for Payload's missing type declaration for the CSS export.
// Remove this file once the package provides its own types for './css'.
// See https://github.com/payloadcms/payload/pull/16348

declare module '@payloadcms/next/css' {
	// No exports, just a side-effect import for CSS
}
