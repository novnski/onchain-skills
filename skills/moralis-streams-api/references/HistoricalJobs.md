# Historical Stream Jobs

Use this reference for the live historical-job endpoints:

- `POST /historical-jobs/create-job` (`CreateJob`)
- `GET /historical-jobs` (`GetJobs`)

## Known Request Shape

The live Swagger requires these create-job fields:

| Field | Type | Required |
| --- | --- | --- |
| `chainId` | string | Yes |
| `streamId` | string | Yes |
| `fromTimestamp` | number | Yes |
| `toTimestamp` | number | Yes |
| `addresses` | string array | No |

`GET /historical-jobs` accepts an optional `streamId` query parameter.

## Important Scope Caveat

The live Swagger does not currently describe:

- whether timestamps are seconds or milliseconds
- which stream families support historical jobs
- job lifecycle/status semantics beyond the response schema

Do not infer Solana or Bitcoin support from the generic paths. Confirm timestamp units and family support with current product documentation or Moralis before creating a production job.

## Rule Files

- [CreateJob](../rules/CreateJob.md)
- [GetJobs](../rules/GetJobs.md)
