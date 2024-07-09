--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: templates; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.templates (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    author character varying(80) NOT NULL,
    uuid character varying(80) NOT NULL,
    downloads integer,
    uploaded_at timestamp without time zone NOT NULL
);


ALTER TABLE public.templates OWNER TO admin;

--
-- Name: templates_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.templates_id_seq OWNER TO admin;

--
-- Name: templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.templates_id_seq OWNED BY public.templates.id;


--
-- Name: templates id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.templates ALTER COLUMN id SET DEFAULT nextval('public.templates_id_seq'::regclass);


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.templates (id, name, author, uuid, downloads, uploaded_at) FROM stdin;
219	Asymptotic Notation	jeremy.spence272@gmail.com	0642eb50-30f7-444f-83f9-26d19c2f6801	0	2024-07-09 16:52:19.79
220	Tree & Graph Algorithms	jeremy.spence272@gmail.com	b6967039-a160-41e3-9fd5-e2b6f67facd7	0	2024-07-09 16:52:19.791
221	React Components	jeremy.spence272@gmail.com	4df5271b-c434-4f59-ab8f-b249c2949f9e	0	2024-07-09 16:52:19.788
209	HTML 101	jeremy.spence272@gmail.com	9f1eed82-3acf-4e07-a1bd-1f0b26cf1dca	0	2024-07-09 16:52:19.787
210	Internet 101	jeremy.spence272@gmail.com	bc9836f9-5d40-4e51-9ad2-db08fddaf337	0	2024-07-09 16:52:19.787
211	CSS 101	jeremy.spence272@gmail.com	7f645bfa-4e29-42b6-87ab-a598697b7488	0	2024-07-09 16:52:19.788
212	Javascript 101	jeremy.spence272@gmail.com	d946ac90-ccd0-4911-b370-5d0d97ddca0c	0	2024-07-09 16:52:19.788
213	React Rendering	jeremy.spence272@gmail.com	42b9891a-48e2-4fba-89cc-d09cb494edc1	0	2024-07-09 16:52:19.789
214	React State Management	jeremy.spence272@gmail.com	bb19f59d-0578-443f-8995-22945fbbca14	0	2024-07-09 16:52:19.789
215	React Styling	jeremy.spence272@gmail.com	bd84ea8c-2b4b-4ee8-ba77-e589c20f3205	0	2024-07-09 16:52:19.789
216	React API Calls	jeremy.spence272@gmail.com	f9cf0402-2942-423a-9f43-4dbc2542c5aa	0	2024-07-09 16:52:19.79
217	React Testing	jeremy.spence272@gmail.com	4024876d-f752-4f19-8138-de6560bde550	0	2024-07-09 16:52:19.79
218	Sorting Algorithms	jeremy.spence272@gmail.com	11961542-d821-4733-ab7e-075411a01a08	0	2024-07-09 16:52:19.79
\.


--
-- Name: templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.templates_id_seq', 221, true);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- Name: templates templates_uuid_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_uuid_key UNIQUE (uuid);


--
-- Name: templates templates_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_author_fkey FOREIGN KEY (author) REFERENCES public.users(email) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

