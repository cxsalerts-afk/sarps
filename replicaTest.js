const { MongoClient } = require('mongodb');

const uri = "mongodb://AmberAdmin:$UAmber^eam667-89@amberdocdb.cluster-czom80yi4ele.ap-south-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";

async function testReplica() {
  let client;
  try {
    client = new MongoClient(uri); // no deprecated options
    await client.connect();

    console.log("✅ Connected to MongoDB Replica Set");

    const adminDb = client.db().admin();
    const replStatus = await adminDb.command({ replSetGetStatus: 1 });

    console.log("🧩 Replica Set Members:");
    replStatus.members.forEach(m =>
      console.log(` - ${m.name} [state: ${m.stateStr}]`)
    );

    const db = client.db("replicaTest");
    const collection = db.collection("testData");

    // Insert a test document
    const doc = { name: "Replica Test", timestamp: new Date() };
    await collection.insertOne(doc);
    console.log("✅ Inserted test document");

    // Read the same document
    const result = await collection.findOne({ name: "Replica Test" });
    console.log("📖 Read from DB:", result);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    if (client) await client.close();
    console.log("🔒 Connection closed");
  }
}

testReplica();
