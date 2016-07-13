var link = 'http://stack-builder-yaboi.c9users.io/#/create';
var embedElementId = 'concierge_widget_inline';
var iframe = document.createElement('iframe');
iframe.frameBorder=0;
iframe.width="100%";
iframe.height="100%";
iframe.setAttribute("src", link);
document.getElementById(embedElementId).appendChild(iframe);