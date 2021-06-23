require("dotenv").config({ override: true });
const { WITH_NODE_CLUSTER } = process.env;
if (WITH_NODE_CLUSTER === "true") {
  require("./server-cluster");
} else {
  require("./server-not-cluster");
}
