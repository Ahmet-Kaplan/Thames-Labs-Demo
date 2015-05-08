Companies = new Mongo.Collection("companies");
Partitioner.partitionCollection(Companies);

Customers = new Mongo.Collection("customers");
Customers.permit(['insert']).ifHasRole('superadmin').apply();
