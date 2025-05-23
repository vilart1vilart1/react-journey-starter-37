ALTER VIEW [dbo].[V_External_Article] AS
SELECT *,

CASE 
  WHEN LEN(ItemNo) - LEN(REPLACE(ItemNo,'|','')) = 4
	THEN 
		left(right(ItemNo, len(ItemNo)- (CHARINDEX('||', ItemNo)+1)),
		charindex('||',right(ItemNo, len(ItemNo)- (CHARINDEX('||', ItemNo)+2)))) 
  ELSE 'false'
END as LmobileItemNo, Right(ItemNo,3) as SupplierItemNo, LEFT(ItemNo,6) as TopLogNo
from [dbo].[S_Article]  WHERE Mandatory = 0