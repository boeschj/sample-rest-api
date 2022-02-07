function convertDocumentSnapshotToData(
  docSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) {
  const data: any = docSnapshot.data();
  return data;
}

const convertQuerySnapshotToDataList = (
  docList: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) => {
  const dataList: any[] = [];
  docList.forEach((doc) => {
    dataList.push(convertDocumentSnapshotToData(doc));
  });
  return dataList;
};

export { convertDocumentSnapshotToData, convertQuerySnapshotToDataList };
