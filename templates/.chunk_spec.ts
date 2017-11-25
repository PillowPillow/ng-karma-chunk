(() => {
	const ctx = (require as any).context('./', true, /\.spec\.ts$/);
	ctx.keys().map(ctx);
})();
