import React from "react";

const NoResultFound = () => {
  return (
    <div>
      <h3>نأسف لم نستطيع العثور على نتائج بحثك</h3>
      <p style={{marginBlockStart:'10px'}}>هذا البحث حساس للحروف من حيث الهمزات وغيره</p>
    </div>
  );
};

export default NoResultFound;
