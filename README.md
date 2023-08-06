# Forms Playground

Simple project to implemente a modular form.

## Configuration

There is a `src/model/model.ts` where you can define the required status of the form fields.

## Architecture

This form uses a modular approach. Instead of writing the schema for the form, I have extracted the validations into hooks that validates:

* strings
* integers
* dates
* emails

They have common parameters like `min`, `max`, and `isRequired`. The `isRequired` has the main logic to make the field required. The rest only define the field properties.

Any additional or special validations can be made into the `superRefine` method of the main schema.

## Logic

Every field is optional, and then we check if it is required in a `refine` method. After that, we validate the additional properties like `min` or `max`.
