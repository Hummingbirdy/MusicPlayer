CREATE TABLE [dbo].[TagReferences] (
	[TagReferenceId]	INT				NOT NULL		IDENTITY(1,1),
    [TagId]				INT				NOT NULL,
	[UserId]			NVARCHAR(50)	NOT NULL		DEFAULT '9b107906-4975-49fa-8d7a-d6f2274d995b',
    [YouTubeId]			NVARCHAR(100)	NOT NULL, 
    [Fixed]				BIT				NULL
);

