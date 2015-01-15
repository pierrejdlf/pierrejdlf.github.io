var fs = require('fs');
var request = require('request');
var _ = require('underscore');

console.log("Welcome.");



var dataurl = "http://localhost/pierrejdlf.github.io/app/miniProxy.php/https://gingkoapp.com/farfouille.json";



var getPrepairedData = function(json) {
  //////////////////////////////////////////////////////////////////////
  var removeEmpties = function(list) {
    return _.filter(list, function(d) {
      return d.content;
    });
  };
  var extractRegexp = function(d,key,r,split) {
    var regexp = new RegExp(r);
    if(regexp.test(d.content)) {
        var mat = d.content.match(regexp);
        if(mat.length>1) {
          d[key] = mat[1];
          d.type = key;
        }
        d.content = d.content.replace(regexp,"");
    }
    return d;
  };
  var recursiveYam = function(list) {
    _.each(list, function(d,k) {
      // do it for all children
      if(d.children) {
        d.children = removeEmpties(d.children);
        recursiveYam(d.children);
      }
      // parse content
      if(d.content) {
        // warning: double escape needed as we will treat strings as regexp
        extractRegexp(d,'title','^#([^\\n]*)\\n');
        extractRegexp(d,'subtitle','^##([^\\n]*)\\n');
        extractRegexp(d,'img','^!\\[\\w*]\\(([^\\n\\)]*)\\)\\n*');
        extractRegexp(d,'vimeo','^(https*://vimeo.com.+)\\n*');
        extractRegexp(d,'iframe','^(https*://pierrejdlf.github.io/(tellme|treeword|static|gifcomics|streetmap)[^\\n]*)\\n*');
        extractRegexp(d,'redirect','^(https*://[^\\n]+)\\n*');
        extractRegexp(d,'text','^---\\n((.|\\n)+)');
      }
    });
  };
  //////////////////////////////////////////////////////////////////////

  // remove empty ones
  var root = json.slice(1)[0]; //omit first element (info)
  recursiveYam([root]);
  return root;
}

request({
    uri: dataurl,
    json: true
  }, function(error,response,body) {
  if(!error && response.statusCode == 200) {

    //console.log("received",body);

    // do things on data
    var result = getPrepairedData(body);

    // write output
    fs.writeFile("p/data/contents.json", JSON.stringify(result, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("The file was saved!");
      }
    });

  } else {
    console.log("error");
  }
});


