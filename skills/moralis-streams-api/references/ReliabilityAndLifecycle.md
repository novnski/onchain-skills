# Reliability and Lifecycle

Use this reference for Streams docs topics that describe delivery behavior rather than a single endpoint.

## Creation and Test Webhooks

Creating or updating a stream triggers a test webhook. The webhook endpoint must return a `2xx` response before the stream can be considered healthy.

If a stream fails to activate:
- Confirm the webhook URL is reachable from the public internet.
- Return quickly with a `2xx` response.
- Move slow processing to a queue or background worker.

## Confirmation and Finality

Streams can send unconfirmed and confirmed events. Treat confirmed events as the durable source of truth when the application must avoid acting on re-orged data.

Handlers should store a stable event key and update state when a later confirmed event arrives.

## Ordering and Idempotency

Streams are designed for reliable delivery, not strict global ordering. Webhook consumers must be idempotent because retries and replays can deliver the same logical event more than once.

Recommended idempotency keys include stream ID plus transaction hash plus log index or another chain-specific event identifier from the payload.

## Retries, Replays, and Delivery

Moralis retries failed webhook deliveries. Use the history and replay endpoints when a failed delivery needs to be inspected or replayed.

Relevant rule files:
- `rules/GetHistory.md`
- `rules/GetLogs.md`
- `rules/ReplayHistory.md`
- block replay helpers for EVM, Solana, and Bitcoin

## Rate Limits and Reloads

Large address lists, all-address streams, and broad filters can increase stream processing and webhook volume. Updating address lists or stream configuration can cause reload work, so batch changes when possible.

## Re-org Handling

Design consumers to handle chain reorganizations and duplicate event states. Do not treat an unconfirmed webhook as final if the workflow depends on settlement.

## Payload Parsing

Payload shape differs by family:
- EVM payloads include decoded logs, token transfers, NFT transfers, approvals, native transactions, and optional trigger output.
- Solana payloads include Solana transaction and balance/instruction structures.
- Bitcoin payloads focus on transaction inputs, outputs, addresses, and confirmation state.

Read `references/WebhookResponseBody.md` and the family-specific reference before building parsers.
