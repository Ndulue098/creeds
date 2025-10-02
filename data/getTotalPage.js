export async function getTotalPage(firestoreQuery,pageSize){
    const queryCount=firestoreQuery.count();
  const countSnapshot=await queryCount.get()
  const countData=countSnapshot.data();
  const total=countData.count;
  const totalPages=Math.ceil(total/pageSize)
  return totalPages
}