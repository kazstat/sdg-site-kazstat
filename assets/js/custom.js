// Customize the data rounding function.
opensdg.dataRounding = function(value) {
  return value;
  //return Math.round(value * 100) / 100;
};

opensdg.chartConfigAlter(function(config, info) {
  // Force the "bar" type if there are less than 2 years of data.
  if (config.type === 'line' && info.labels.length < 2) {
    var overrides = {type: 'bar'}
    $.extend(true, config, overrides);
  }
});
