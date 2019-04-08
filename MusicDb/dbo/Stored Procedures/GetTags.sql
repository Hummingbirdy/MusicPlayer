CREATE PROCEDURE [dbo].[GetTags]
	@userId VARCHAR(50)
AS
	SELECT 
		[TagId], 
		[Tag],
		[TagType],
		[Color]
	FROM 
		Tags
	WHERE
		[UserId] = @userId
RETURN 0
