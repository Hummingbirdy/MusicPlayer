CREATE TABLE [dbo].[MediaType] (
    [TypeId]			INT				NOT NULL		IDENTITY (1, 1),
    [Type]				VARCHAR (15)	NOT NULL,

    PRIMARY KEY CLUSTERED ([TypeId] ASC)
);

