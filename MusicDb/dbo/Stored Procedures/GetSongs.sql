CREATE PROCEDURE [dbo].[GetSongs]
	@userId NVARCHAR(50)

AS
	SELECT
		*
	FROM
		[dbo].[Songs]
	WHERE
		[UserId] = @userId
RETURN 0
