BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tasks] (
    [Id] NVARCHAR(1000) NOT NULL,
    [Title] VARCHAR(64) NOT NULL,
    [Description] VARCHAR(1000) NOT NULL,
    [Status] VARCHAR(16) NOT NULL,
    [CreatedAt] DATETIME2 CONSTRAINT [tasks_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIME2,
    CONSTRAINT [tasks_pkey] PRIMARY KEY CLUSTERED ([Id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
