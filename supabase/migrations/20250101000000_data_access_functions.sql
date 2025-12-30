-- SQL functions for direct SQL data access strategy
-- These functions enable the SqlRepository implementation

-- Function to query a single row
CREATE OR REPLACE FUNCTION query_single(
  query_text text,
  params jsonb DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  EXECUTE query_text
  INTO result
  USING params;

  RETURN result;
END;
$$;

-- Function to query multiple rows
CREATE OR REPLACE FUNCTION query_many(
  query_text text,
  params jsonb DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  EXECUTE format('SELECT jsonb_agg(row_to_json(t.*)) FROM (%s) t', query_text)
  INTO result
  USING params;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to execute SQL (for DELETE, UPDATE without RETURNING)
CREATE OR REPLACE FUNCTION execute_sql(
  query_text text,
  params jsonb DEFAULT '[]'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE query_text
  USING params;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION query_single TO authenticated;
GRANT EXECUTE ON FUNCTION query_many TO authenticated;
GRANT EXECUTE ON FUNCTION execute_sql TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION query_single IS 'Execute a SQL query and return a single row as JSONB';
COMMENT ON FUNCTION query_many IS 'Execute a SQL query and return multiple rows as JSONB array';
COMMENT ON FUNCTION execute_sql IS 'Execute a SQL statement without returning data';
