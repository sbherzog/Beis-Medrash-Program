USE [master]
GO
/****** Object:  Database [BeisMedrashProgram]    Script Date: 12/31/17 10:17:32 AM ******/
CREATE DATABASE [BeisMedrashProgram]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BeisMedrashProgram', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\BeisMedrashProgram.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BeisMedrashProgram_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\BeisMedrashProgram_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [BeisMedrashProgram] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BeisMedrashProgram].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BeisMedrashProgram] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET ARITHABORT OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BeisMedrashProgram] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BeisMedrashProgram] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BeisMedrashProgram] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BeisMedrashProgram] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [BeisMedrashProgram] SET  MULTI_USER 
GO
ALTER DATABASE [BeisMedrashProgram] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BeisMedrashProgram] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BeisMedrashProgram] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BeisMedrashProgram] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BeisMedrashProgram] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BeisMedrashProgram] SET QUERY_STORE = OFF
GO
USE [BeisMedrashProgram]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [BeisMedrashProgram]
GO
/****** Object:  Table [dbo].[tbl_beis_medrash]    Script Date: 12/31/17 10:17:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_beis_medrash](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BeisMedrashName] [nvarchar](150) NOT NULL,
	[Logo] [varchar](50) NULL,
	[Address] [varchar](150) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](50) NULL,
	[Zip] [varchar](50) NULL,
	[Phone] [varchar](50) NULL,
	[BeisMedrashCode] [int] NOT NULL,
 CONSTRAINT [PK_tbl_beis_medrash] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_forgotten_passwords]    Script Date: 12/31/17 10:17:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_forgotten_passwords](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Token] [varchar](255) NOT NULL,
	[UserId] [int] NOT NULL,
	[TimeStamp] [datetime] NOT NULL,
 CONSTRAINT [PK_ForgottenPasswords] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_members]    Script Date: 12/31/17 10:17:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_members](
	[MemberId] [int] IDENTITY(1,1) NOT NULL,
	[EnTitle] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
	[FirstName] [varchar](150) NULL,
	[HeTitle] [nvarchar](150) NULL,
	[HeLastName] [nvarchar](150) NULL,
	[HeFirstName] [nvarchar](150) NULL,
	[HeSuffix] [nvarchar](150) NULL,
	[AddNum] [varchar](150) NULL,
	[AddStreet] [varchar](150) NULL,
	[Apt] [varchar](50) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Zip] [varchar](50) NULL,
	[HomePhone] [varchar](50) NULL,
	[CellPhone] [varchar](50) NULL,
	[Email] [varchar](150) NULL,
	[Notes] [nvarchar](max) NULL,
	[Active] [varchar](50) NULL,
	[SendEmail] [varchar](50) NULL,
	[Type] [nvarchar](50) NULL,
	[SendStatement] [varchar](50) NOT NULL,
	[TotalBalance] [money] NULL,
	[CreteDate] [datetime] NULL,
	[SyncTime] [datetime] NULL,
	[BeisMedrashId] [int] NOT NULL,
 CONSTRAINT [PK_tbl_members] PRIMARY KEY CLUSTERED 
(
	[MemberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_users]    Script Date: 12/31/17 10:17:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](150) NOT NULL,
	[LastName] [varchar](150) NOT NULL,
	[Email] [varchar](150) NOT NULL,
	[PasswordHash] [varchar](255) NOT NULL,
	[PasswordSalt] [varchar](255) NULL,
	[BeisMedrashId] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_forgotten_passwords]  WITH CHECK ADD  CONSTRAINT [FK_ForgottenPasswords_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[tbl_users] ([Id])
GO
ALTER TABLE [dbo].[tbl_forgotten_passwords] CHECK CONSTRAINT [FK_ForgottenPasswords_Users]
GO
ALTER TABLE [dbo].[tbl_members]  WITH CHECK ADD  CONSTRAINT [FK_tbl_members_tbl_beis_medrash] FOREIGN KEY([BeisMedrashId])
REFERENCES [dbo].[tbl_beis_medrash] ([Id])
GO
ALTER TABLE [dbo].[tbl_members] CHECK CONSTRAINT [FK_tbl_members_tbl_beis_medrash]
GO
ALTER TABLE [dbo].[tbl_users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Users] FOREIGN KEY([BeisMedrashId])
REFERENCES [dbo].[tbl_beis_medrash] ([Id])
GO
ALTER TABLE [dbo].[tbl_users] CHECK CONSTRAINT [FK_Users_Users]
GO
USE [master]
GO
ALTER DATABASE [BeisMedrashProgram] SET  READ_WRITE 
GO
