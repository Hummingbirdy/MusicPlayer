CREATE PROCEDURE [dbo].[GetTags]
AS
	SELECT 
		[TagId], 
		[Tag],
		[TagType]
	FROM 
		Tags
RETURN 0
