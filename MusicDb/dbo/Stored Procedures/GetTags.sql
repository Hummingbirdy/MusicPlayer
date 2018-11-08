CREATE PROCEDURE [dbo].[GetTags]
AS
	SELECT 
		[TagId], 
		[Tag]
	FROM 
		Tags
RETURN 0
