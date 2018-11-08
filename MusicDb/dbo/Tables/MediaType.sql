CREATE TABLE [dbo].[MediaType] (
    [TypeId] INT          IDENTITY (1, 1) NOT NULL,
    [Type]   VARCHAR (15) NOT NULL,
    PRIMARY KEY CLUSTERED ([TypeId] ASC)
);

