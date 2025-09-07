import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CreateExampleMongodbDocDto } from '@tmdjr/seed-service-nestjs-contracts';

// Simple JSON validator: only validates when a value is present
function jsonValidator(
  ctrl: AbstractControl
): ValidationErrors | null {
  const v = ctrl.value as string;
  if (!v || v.trim() === '') return null;
  try {
    JSON.parse(v);
    return null;
  } catch {
    return { invalidJson: true };
  }
}

export type CreateForm = FormGroup<{
  name: FormControl<string>;
  type: FormControl<'SOME_ENUM' | 'SOME_OTHER_ENUM'>;
  description: FormControl<string>;
  archived: FormControl<boolean>;
  // Using Date | null in the form, serialize to string in DTO
  lastUpdated: FormControl<Date | null>;
  // Textarea-bound JSON string; parsed to ExampleMongodbDocObjectDto on submit
  exampleMongodbDocObjectJson: FormControl<string>;
}>;

@Injectable({ providedIn: 'root' })
export class ExampleFormService {
  constructor(private fb: FormBuilder) {}

  createCreateForm(
    initial?: Partial<CreateExampleMongodbDocDto>
  ): CreateForm {
    return this.fb.group({
      name: this.fb.control(initial?.name ?? '', {
        validators: [Validators.required, Validators.maxLength(120)],
        nonNullable: true,
      }),
      type: this.fb.control((initial?.type as any) ?? 'SOME_ENUM', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: this.fb.control(initial?.description ?? '', {
        validators: [Validators.maxLength(1000)],
        nonNullable: true,
      }),
      archived: this.fb.control(Boolean(initial?.archived ?? false), {
        nonNullable: true,
      }),
      lastUpdated: this.fb.control(
        initial?.lastUpdated ? new Date(initial.lastUpdated) : null
      ),
      exampleMongodbDocObjectJson: this.fb.control(
        initial?.exampleMongodbDocObject
          ? JSON.stringify(initial.exampleMongodbDocObject, null, 2)
          : '',
        { validators: [jsonValidator], nonNullable: true }
      ),
    });
  }

  toCreateDto(form: CreateForm): CreateExampleMongodbDocDto {
    const v = form.getRawValue();

    const dto: CreateExampleMongodbDocDto = {
      name: v.name,
      type: v.type,
    } as CreateExampleMongodbDocDto;

    if (v.description?.trim()) dto.description = v.description.trim();
    if (v.archived === true) dto.archived = true; // omit when false

    if (v.lastUpdated) {
      // ISO string; adjust as needed for your API expectations
      dto.lastUpdated = new Date(v.lastUpdated).toISOString();
    }

    if (
      v.exampleMongodbDocObjectJson &&
      v.exampleMongodbDocObjectJson.trim()
    ) {
      try {
        dto.exampleMongodbDocObject = JSON.parse(
          v.exampleMongodbDocObjectJson
        );
      } catch {
        // Leave it out if invalid; template should prevent submit via validator
      }
    }

    return dto;
  }
}
