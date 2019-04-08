CREATE PROCEDURE [dbo].[GetSongs]
	@userId NVARCHAR(50)

AS
	SELECT
		[SongId], 
		[UserId], 
		[YouTubeId], 
		[Name], 
		[Type], 
		[Thumbnail], 
		[PublishedDate], 
		[CreatedDate], 
		[UpdatedDate]
	FROM
		[dbo].[Songs]
	WHERE
		[UserId] = @userId
RETURN 0
