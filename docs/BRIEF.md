# Project brief (from Ayoub, 21 October 2026)

Stored word for word. This is the standing technical brief for the EBM website. The
blueprint PDF (`EBM_Website_Blueprint_v1.1.pdf`, on the "Ayoub 240GB" drive) and EBM's
site map (`Arborescence_Website_EBM.xlsx`, in `~/Documents/ayoub/UI:UX projects/EBM WEBSITE/`)
are the requirements it refers to.

---

Act as a senior full-stack architect and developer. Help me architect and build the new website for Écoles Belges au Maroc (EBM), covering its Casablanca and Rabat campuses.

Read the attached blueprint completely before starting. Treat it as project requirements and reference material. Distinguish approved requirements from proposals, examples, and unresolved decisions.

The project needs a premium, mobile-first school website with 15 main pages, an editable CMS, visit booking, and integration with Eduka. French is the launch language.

1. Recommended technology stack

Use this architecture unless a verified project constraint requires a change:

- Next.js App Router and TypeScript for the public website and server endpoints.
- Tailwind CSS and shadcn/ui for styling and accessible interface primitives.
- Payload CMS, integrated into the Next.js application, for content administration.
- Supabase PostgreSQL for website content, booking records, temporary application drafts, and integration delivery records.
- Supabase Storage for public media and separately protected application documents.
- React Hook Form and Zod for forms and validation.
- Trigger.dev for background jobs, integration retries, reminders, and expiry tasks.
- Resend and React Email for transactional emails.
- Cloudflare Turnstile and server-side rate limiting for form protection.
- Illustrated SVG campus maps initially, with a replaceable Mappedin integration.
- GitHub for source control and Vercel Pro for hosting.

Verify current version compatibility, especially between Next.js and Payload. Pin compatible versions.

Keep the architecture manageable. Do not introduce another backend framework, ORM, authentication service, or infrastructure product without explaining why it is needed.

2. Website structure and hosting

Build one application with multiple page URLs, one domain, and one main deployment.

The main pages are:

- Accueil
- Le réseau EBM
- Pédagogie
- L’école du dehors
- Grandir aux EBM
- Nos campus
- Campus Casablanca
- Campus Rabat
- Après les EBM
- Admissions
- Comprendre les admissions, including the FAQ
- Documents & frais
- Calendrier & visites
- Candidater en ligne
- Contact

Also support legal/privacy pages, search results, confirmation pages, a 404 page, and any necessary event detail templates.

Use shared layouts and reusable components. Casablanca and Rabat must share a campus template with different content.

Pre-render or cache public content where appropriate and refresh it when editors publish changes. Booking availability must remain current. Never cache private application data in public pages.

3. CMS and content model

Use Payload as the administration interface EBM staff will use. Supabase is the database/storage provider, not the editorial interface.

Create structured content for:

- Pages and reusable page blocks
- Navigation, footer, and site settings
- Campuses and contacts
- Public events
- FAQs and admissions information
- Fees by school year, campus, and level
- Public PDFs
- Alumni portraits and graduating classes
- Media and galleries
- Editable notification wording

Provide approved blocks such as heroes, introductions, text with images, cards, galleries, videos, quotes, statistics, tabs, FAQs, fee tables, event lists, campus maps, and calls to action.

Editors must be able to add, remove, and reorder approved blocks and create campaign pages without breaking the design system.

Configure drafts, previews, version history, scheduled publishing, and the agreed approval process.

Implement permissions for the project lead, communication team, General Management, and limited admissions access where necessary. Match the blueprint’s final permission matrix.

Explicitly address two-step login and activity logging. Do not assume all requested administration features exist automatically.

Keep applications, admissions decisions, enrolment, billing, and dossier follow-up in Eduka.

4. Database, files, and secrets

Clearly separate:

- Integration logic: server-side application code.
- API credentials: server/worker environment variables or secret management.
- Structured records: PostgreSQL.
- Uploaded files: object storage.
- Official admissions records: Eduka.

Never expose Eduka credentials, database credentials, or storage secrets to the browser. Never put private secrets in NEXT_PUBLIC_ variables or commit them to Git.

Separate public school media and downloadable fee PDFs from private family documents.

Use server-controlled authorization and signed file access. Validate upload type, size, and content as appropriate.

Keep temporary application records inaccessible to general CMS editors. Define retention and deletion rules.

5. Eduka integration

Start with integration discovery and a proof of concept.

Do not invent Eduka endpoints, authentication methods, webhook capabilities, or booking features.

Identify what we need from EBM’s Eduka administrator:

- API documentation and credentials
- Authentication method
- Test environment and technical contact
- Supported operations for parents, children, applications, prospects, and documents
- Required fields and campus/level identifiers
- Upload requirements and rate limits
- Duplicate-handling and external-reference support
- Webhook availability
- Existing booking and notification capabilities

Using synthetic data, prove that we can create the required application records, upload a document, obtain an Eduka reference, and verify the result in Eduka.

Design reliable delivery:

- Validate and save the submission.
- Save a “needs delivery” record atomically with it.
- Process delivery through a background worker.
- Record Eduka’s reference and delivery state.
- Retry temporary failures.
- Alert the responsible staff when intervention is required.
- Reconcile uncertain timeouts before creating another application.
- Use stable references and provider-supported idempotency where available.

Acknowledge receipt immediately, but claim successful Eduka delivery only after confirmation.

Send only the required data. Avoid recording sensitive form payloads in logs or background-job metadata.

If the required write API is unavailable, propose Eduka’s hosted application process as the fallback. Embed it only if embedding is supported. Explain how this affects the custom form and styling requirements.

6. Application form

If Eduka’s verified capabilities support it, build the five-step form described in the blueprint:

- Family
- Child or children
- Requested schooling
- Documents
- Review and submission

Provide a visible progress indicator, mobile-friendly uploads, validation, useful errors, and a submission reference.

Implement “save and continue later” with protected server-side drafts and a verified, expiring resume mechanism, such as an email link.

Define draft expiry and document cleanup. Keep admissions follow-up in Eduka.

7. Calendar and visit booking

First determine whether Eduka can own the complete booking workflow.

If it supports the required features, use it as the booking authority. Otherwise, implement a limited booking module using PostgreSQL and Payload.

Support:

- Two campuses
- Personalised visits, open days, remote interviews, and webinars
- Public events and filters
- Recurring slots, closures, and holidays
- Capacity measured correctly for each event format
- Requests, validation, confirmation, rejection, cancellation, expiry, and attendance
- Human approval before confirming campus visits
- Waiting lists where agreed
- Cancellation links
- Reception visitor lists with restricted access
- Email and optional WhatsApp notifications

Treat the blueprint’s capacities, booking windows, 48-hour holds, and no-show rules as proposals until confirmed.

Reserve capacity transactionally to prevent simultaneous requests from overbooking.

Use Africa/Casablanca timezone rules rather than a fixed UTC offset.

Start with a filtered event list and date picker. Provide .ics downloads and public calendar subscriptions.

Show the same booking form in a desktop side panel, a mobile full-screen flow, and a directly accessible booking route.

8. Notifications

Use Resend for transactional email from EBM’s verified domain.

Implement request receipts, confirmed-visit messages, reminders, cancellations, and follow-ups according to agreed rules.

Before sending a scheduled reminder, check that the booking is still valid and confirmed.

Add WhatsApp Business Platform after verifying EBM’s number setup, permissions, templates, costs, and operational ownership.

Select an SMS backup provider only after verifying Moroccan delivery and sender-name support.

Determine which messages Eduka already sends so families do not receive duplicates.

9. Campus maps

Launch with an approved illustrated SVG map for each campus unless EBM selects another option.

Support clickable public locations and CMS-managed labels or descriptions. Provide Google Maps directions for reaching each campus.

Make the map component replaceable with Mappedin.

If Mappedin is selected:

- Verify licensing, map production requirements, publication controls, and maintenance responsibilities.
- Begin with its embedded viewer.
- Use the SDK only when custom interactions justify it.

Publish a separate public map dataset. Omit restricted information from delivered assets and data; hiding labels or using CSS is insufficient.

Follow the blueprint’s rules for meeting-point disclosure and no live visitor tracking.

10. Design, search, media, and analytics

Follow EBM’s supplied brand assets and the blueprint’s visual direction. Use the supplied logo and campus pictograms.

Build responsive navigation, accessible mega-menus, clear visit/application actions, keyboard support, reduced-motion behavior, and readable contrast.

Verify the Avenir Next web licence or propose an approved alternative.

Use Payload’s Search plugin for published pages and FAQ answers.

Connect Instagram only after verifying account access and integration requirements. Cache the feed and provide a reliable account-link fallback.

Optimize images and video delivery. Decide whether a dedicated video-streaming service is needed based on the actual media requirements.

Implement metadata, canonical URLs, sitemap, redirects, and applicable structured data. Do not promise search rankings or rich-result eligibility.

Configure consent-aware analytics for meaningful visit, application, and contact events. Keep personal information out of analytics.

Prepare the content model and routing for later English or Arabic support, including RTL considerations.

11. Hosting, privacy, backups, and testing

Use separate development, staging, and production environments. Use synthetic data outside production.

Put production accounts and services under EBM’s ownership with appropriate collaborator access.

Have EBM validate hosting regions, processors, retention, and relevant Moroccan/CNDP requirements before real family data is collected. Do not assume a European hosting region automatically resolves compliance.

Back up both PostgreSQL and stored files. Database backups alone do not protect file contents.

Implement the agreed 30-day recovery requirement, monitoring, failure alerts, and a tested restoration process.

Test the critical behaviors:

- Mobile and keyboard navigation
- Staff permissions and private-file access
- Application saving and resuming
- Upload failures
- Simultaneous booking requests
- Approval, cancellation, expiry, and reminders
- Eduka outages, retries, uncertain responses, and duplicate prevention
- Backup restoration

12. Work sequence and expected output

Start by providing:

- Your understanding of the requirements.
- The proposed architecture and why it fits.
- A clear division of responsibility between the website and Eduka.
- The content/data model.
- The project folder structure.
- Verified dependencies and unresolved external requirements.
- A phased implementation plan.

Then proceed incrementally through:

1. Eduka proof of concept and booking ownership.
2. Next.js, Payload, database, storage, and page blocks.
3. Admissions content and booking.
4. The verified application route.
5. Remaining pages, media, and maps.
6. Production validation and handover documentation.

Do not present mocked integrations as working production features. Clearly label placeholders and blockers.

Clarify the blueprint’s scheduling inconsistency: page 4 identifies 6 November 2026 as the V1 deadline, while page 39 identifies it as the wireframes review.

Ask only questions that materially block the next step. Continue independent work while external access or decisions are pending.

---

## Instructions given with this brief (21 Oct 2026)

- Use the design skills (impeccable, apple-design, the "taste" rules in memory) and start by coding
  the **home page** only.
- The other 14 main pages exist as **placeholders** until Ayoub says what goes in each.
- The website must be **fast to load**.
- Keep everything recorded (this folder + Claude memory) so work can resume later.
