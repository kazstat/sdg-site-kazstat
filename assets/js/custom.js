// Customize the data rounding function.
opensdg.dataRounding = function(value) {
 if (value == null) {
    return value
  }
  else {
    return Number(value.toPrecision(7))
  }
};

opensdg.chartConfigAlter(function(config, info) {
  // Force the "bar" type if there are less than 2 years of data.
  if (config.type === 'line' && info.labels.length < 2) {
    var overrides = {type: 'bar'}
    $.extend(true, config, overrides);
  }
});
