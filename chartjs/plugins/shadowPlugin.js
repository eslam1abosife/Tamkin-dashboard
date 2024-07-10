const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDatasetsDraw(chart, args, options) {
    const ctx = chart.ctx;
    ctx.save();

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden && meta.type === 'line') {
        ctx.shadowColor = options.shadowColor || 'rgba(31, 139, 36, 0.18)';
        ctx.shadowBlur = options.shadowBlur || 8;
        ctx.shadowOffsetX = options.shadowOffsetX || 0;
        ctx.shadowOffsetY = options.shadowOffsetY || 4;
        
        const originalStroke = ctx.stroke;
        ctx.stroke = function() {
          ctx.save();
          originalStroke.apply(this, arguments);
          ctx.restore();
        };

        meta.dataset.draw(ctx);
      }
    });

    ctx.restore();
  },
  afterDatasetsDraw(chart) {
    chart.ctx.restore();
  }
};

export default shadowPlugin;
