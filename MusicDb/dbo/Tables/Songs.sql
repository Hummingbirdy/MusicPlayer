CREATE TABLE [dbo].[Songs] (
    [SongId]			INT				NOT NULL	IDENTITY (1, 1),
	[UserId]			NVARCHAR(50)	NOT NULL,
	[YouTubeId]			NVARCHAR(100)	NULL,
    [Name]				NVARCHAR (100)	NULL,
    [Type]				INT				NULL,
	[Thumbnail]			NVARCHAR (100)	NULL,
	[PublishedDate]		DATETIME2		NULL,
    [CreatedDate]		DATETIME		NULL,
    [UpdatedDate]		DATETIME		NULL,

    PRIMARY KEY CLUSTERED ([SongId] ASC)
);

