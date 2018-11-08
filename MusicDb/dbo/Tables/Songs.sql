CREATE TABLE [dbo].[Songs] (
    [SongId]      INT           IDENTITY (1, 1) NOT NULL,
	[YouTubeId]	  NVARCHAR(100)  NULL,
    [Name]        NVARCHAR (100) NULL,
    [Type]        INT           NULL,
	[Thumbnail]   NVARCHAR (100) NULL,
	[PublishedDate] DATETIME2,
    [CreatedDate] DATETIME      NULL,
    [UpdatedDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([SongId] ASC)
);

