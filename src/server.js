require("dotenv").config({ override: true });
const { WITH_NODE_CLUSTER } = process.env;
console.log('WITH_NODE_CLUSTER: '+WITH_NODE_CLUSTER);
if (WITH_NODE_CLUSTER === "true") {
  require("./server-cluster");
} else {
  require("./server-not-cluster");
}
