CREATE TYPE [dbo].[SongsImportType] AS TABLE
(
	[UserId] NVARCHAR(50),
	[YouTubeId] NVARCHAR (100),
	[Name] NVARCHAR (100),
	[Thumbnail] NVARCHAR (100),
	[PublishedDate] DATETIME2
)
