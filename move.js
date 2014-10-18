/*global java*/

var input = java.io.FileReader("app/rawdata/move.poke");
var buffer = java.io.BufferedReader(input);
var jsonstring = "";
var line = buffer.readLine();
while(line !== null) {
  jsonstring += line;
  jsonstring += "\n";
  line = buffer.readLine();
}
var x = JSON.parse(jsonstring, function(key, value) {
  if (key === "type") {
    var map = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock",
               "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric",
               "Psychic", "Ice", "Dragon", "Dark", "Fairy"];
    return map[value];
  }
  return value;
});
var output = JSON.stringify(x);
print(output);
