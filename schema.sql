#	table_name	column_name	data_type	is_nullable
1	Account	id	text	NO
2	Account	userId	text	NO
3	Account	type	text	NO
4	Account	provider	text	NO
5	Account	providerAccountId	text	NO
6	Account	refresh_token	text	YES
7	Account	access_token	text	YES
8	Account	expires_at	integer	YES
9	Account	token_type	text	YES
10	Account	scope	text	YES
11	Account	id_token	text	YES
12	Account	session_state	text	YES
13	Session	id	text	NO
14	Session	sessionToken	text	NO
15	Session	userId	text	NO
16	Session	expires	timestamp without time zone	NO
17	Todo	id	text	NO
18	Todo	title	text	NO
19	Todo	completed	boolean	NO
20	Todo	createdAt	timestamp without time zone	NO
21	Todo	updatedAt	timestamp without time zone	NO
22	Todo	userId	text	NO
23	User	id	text	NO
24	User	name	text	YES
25	User	email	text	YES
26	User	emailVerified	timestamp without time zone	YES
27	User	password	text	YES
28	User	image	text	YES
29	VerificationToken	identifier	text	NO
30	VerificationToken	token	text	NO
31	VerificationToken	expires	timestamp without time zone	NO
32	_prisma_migrations	id	character varying	NO
33	_prisma_migrations	checksum	character varying	NO
34	_prisma_migrations	finished_at	timestamp with time zone	YES
35	_prisma_migrations	migration_name	character varying	NO
36	_prisma_migrations	logs	text	YES
37	_prisma_migrations	rolled_back_at	timestamp with time zone	YES
38	_prisma_migrations	started_at	timestamp with time zone	NO
39	_prisma_migrations	applied_steps_count	integer	NO