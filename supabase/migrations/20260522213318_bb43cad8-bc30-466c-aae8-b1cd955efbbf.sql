ALTER TABLE public.orders
  ADD CONSTRAINT orders_amount_positive CHECK (amount > 0),
  ADD CONSTRAINT orders_rate_positive CHECK (rate > 0),
  ADD CONSTRAINT orders_total_positive CHECK (total > 0),
  ADD CONSTRAINT orders_from_currency_len CHECK (char_length(from_currency) BETWEEN 2 AND 10),
  ADD CONSTRAINT orders_to_currency_len CHECK (char_length(to_currency) BETWEEN 2 AND 10),
  ADD CONSTRAINT orders_from_to_diff CHECK (from_currency <> to_currency);