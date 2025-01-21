export async function GET(req) {
  const { searchParams } = new URL(req.url); // Parse query parameters
  const last_name = searchParams.get("last_name") || "";
  const first_name = searchParams.get("first_name") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const classification = searchParams.get("taxonomy_description") || '';
  const limit = searchParams.get("limit") || 48;
  const skip = searchParams.get("skip") || 0;

  const apiUrl = `https://npiregistry.cms.hhs.gov/api/?version=2.1&last_name=${last_name}&first_name=${first_name}&city=${city}&state=${state}&limit=${limit}&skip=${skip}&taxonomy_description=${classification}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}