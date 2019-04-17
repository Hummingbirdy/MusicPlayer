CREATE PROCEDURE [dbo].[GetSongsByTag]
	@tag NVARCHAR (50)
AS
		SELECT
			[s].[SongId], 
			[s].[UserId], 
			[s].[YouTubeId], 
			[s].[Name], 
			[s].[Type], 
			[s].[Thumbnail], 
			[s].[PublishedDate], 
			[s].[CreatedDate], 
			[s].[UpdatedDate]
		FROM
			Songs s
			JOIN TagReferences r ON r.YouTubeId = s.YouTubeId
			JOIN Tags t ON t.TagId = r.TagId
		WHERE
			t.Tag = @tag
RETURN 0
