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

// Show metadata download buttons only for the current language.
(function () {
  if (typeof window.indicatorInit === 'undefined') {
    return;
  }

  var originalIndicatorInit = window.indicatorInit;

  window.indicatorInit = function () {
    var $indicatorData = $('#indicatorData');
    if ($indicatorData.length) {
      var indicatorDownloads = $indicatorData.data('indicatordownloads');
      if (indicatorDownloads && typeof indicatorDownloads === 'object') {
        var lang = (document.documentElement && document.documentElement.lang) ? document.documentElement.lang : '';
        lang = (lang || 'en').toLowerCase();

        var filtered = {};
        Object.keys(indicatorDownloads).forEach(function (label) {
          var item = indicatorDownloads[label];
          if (!item || !item.href) {
            return;
          }
          // Example href: downloads/data-metadata-pdf-ru/indicator_3-9-2.pdf
          if (item.href.indexOf('data-metadata-') !== -1 && item.href.indexOf('-' + lang + '/') !== -1) {
            filtered[label] = item;
          }
        });

        $indicatorData.data('indicatordownloads', Object.keys(filtered).length ? filtered : null);
      }
    }

    return new originalIndicatorInit();
  };
})();
