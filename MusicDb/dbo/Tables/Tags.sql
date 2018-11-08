CREATE TABLE [dbo].[Tags] (
    [TagId] INT           IDENTITY (1, 1) NOT NULL,
    [Tag]   NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([TagId] ASC)
);

